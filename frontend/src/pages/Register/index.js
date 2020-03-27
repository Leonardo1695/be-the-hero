import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import logoImg from '../../assets/logo.svg'

export default function Logon() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso é: ${response.data.id} ao fechar essa mensagem ele será copiado automaticamente e você será redirecionado para o logon.`)

            // navigator.clipboard.writeText(response.data.id);

            var dummy = document.createElement("input");
            document.body.appendChild(dummy);
            dummy.setAttribute('value', response.data.id);
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);

            history.push('/')
        } catch (error) {
            alert('Erro no cadastro, tente novamente.')
            console.log(error)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para logon
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="WhatsApp" value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}    
                        />
                        <input 
                            type="text" 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
