import { Grid, Grid2 } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const InitialCandidato = {
    id: 0,
    rg: '',
    nomecandidato: '',
    vagaId: 0,
    vaga: null,
};

export const CandidatoForm = () => {
    const [candidato, setCandidato] = useState(InitialCandidato);
    const [loading, setLoading] = useState(false);

    const { candidatoId } = useParams();
    const navigate = useNavigate();

    const validate = () => {
        if (!candidato.rg) {
            toast.error('Informe o RG');
            return false;
        }
        if (!candidato.nomecandidato) {
            toast.error('Informe o nome do candidato');
            return false;
        }
        if (candidato.vagaId === 0) {
            toast.error('Informe qual vaga o candidato irá ocupar');
            return false;
        }
        return true;
    };

    const carregarCandidato = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/candidato/${candidatoId}`);
            if (!response.ok) {
                toast.error('Erro ao carregar candidato');
                setLoading(false);
                return;
            }
            const data = await response.json();
            setCandidato(data);
        } catch (error) {
            toast.error('Houve um erro ao carregar os Candidatos');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCandidato((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const salvarCandidato = async () => {
        if (!validate()) return;

        const method = candidatoId !== '0' ? 'PUT' : 'POST';
        const url = candidatoId !== '0' ? `/api/candidato/${candidatoId}` : '/api/candidato';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(candidato),
            });

            if (!response.ok) {
                toast.error('Erro ao salvar candidato');
                setLoading(false);
                return;
            };

            toast.success('Candidato cadastrado com sucesso!');
            navigate('/candidato');
        } catch (error) {
            toast.error('Houve um erro ao cadastrar o candidato');
        }
    };

    const deletarCandidato = async () => {
        if (window.confirm('Tem certeza que deseja deletar o candidato?')) {
            try {
                const response = await fetch(`/api/candidato/${candidatoId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    toast.error('Erro ao deletar candidato');
                    setLoading(false);
                    return;
                }
                toast.success('Candidato deletado com sucesso!');
                navigate('/candidato');
            } catch (error) {
                toast.error('Houve um erro ao deletar o candidato');
            }
        }
    };

    useEffect(() => {
        if (candidatoId != null && candidatoId !== '0') {
            carregarCandidato();
        }
    }, [candidatoId]);

    return (
        <div className='container' >
            <div className='row mt-4'>
                <div className='col'>

                    <div className='row mb-6'>
                        <div className='col'>
                            <h5> Cadastar Candidato</h5>
                        </div>

                        <div className='col'>
                            <button type='button' className='btn btn-success' onClick={console.log("clicou no botão")}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>

                    <div className='row mt-6'>
                        <div className='col-1'>
                            <label> RG</label>
                        </div>
                        <div className='col-2'>
                            <input type="text" className='ml-6' name='rg' value={candidato.rg} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-1'>
                            <label> Nome</label>
                        </div>
                        <div className='col-2'>
                            <input type="text" className='ml-6' name='nomecandidato' value={candidato.nomecandidato} onChange={handleChange} />
                        </div>
                    </div>

                </div>
            </div>
        </div >


    );
};

