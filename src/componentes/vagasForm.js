import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const InitialVaga = {
    id: 0,
    rg: '',
    nomevaga: '',
    candidatoId: 0,
    candidato: null,
};

export const VagasForm = () => {
    const [vaga, setVaga] = useState(InitialVaga);
    const [loading, setLoading] = useState(false);

    const { vagaId } = useParams();
    const navigate = useNavigate();

    const validate = () =>
        vaga.rg && vaga.nomevaga && vaga.candidatoId !== 0
            ? true
            : (toast.error(vaga.rg ? (vaga.nomevaga ? 'Informe o candidato' : 'Informe o nome da vaga') : 'Informe o RG'), false);

    const carregarVaga = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/vaga/${vagaId}`);
            if (!response.ok) throw new Error();
            const data = await response.json();
            setVaga(data);
        } catch {
            toast.error('Houve um erro ao carregar as vagas');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga((prevState) => ({ ...prevState, [name]: value }));
    };

    const salvarVaga = async () => {
        if (!validate()) return;
        const method = vagaId !== '0' ? 'PUT' : 'POST';
        const url = vagaId !== '0' ? `/api/vaga/${vagaId}` : '/api/vaga';
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaga),
            });
            if (!response.ok) throw new Error();
            toast.success('Vaga cadastrada com sucesso!');
            navigate('/vaga');
        } catch {
            toast.error('Houve um erro ao cadastrar a vaga');
        }
    };

    const deletarVaga = async () => {
        if (window.confirm('Tem certeza que deseja deletar a vaga?')) {
            try {
                const response = await fetch(`/api/vaga/${vagaId}`, { method: 'DELETE' });
                if (!response.ok) throw new Error();
                toast.success('Vaga deletada com sucesso!');
                navigate('/vaga');
            } catch {
                toast.error('Houve um erro ao deletar a vaga');
            }
        }
    };

    useEffect(() => {
        if (vagaId && vagaId !== '0') carregarVaga();
    }, [vagaId]);

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col'>

                    <div className='row mb-6'>
                        <div className='col'>
                            <h4>Cadastrar Vagas</h4>
                        </div>

                        <div className='col'>

                            <button type='button' className='btn btn-success' onClick={console.log("cadastrou a vaga")}>
                                Salvar
                            </button>
                        </div>
                    </div>

                    <div className='row mt-6'>
                        <div className='col-1'>
                            <label>Nome:</label>
                        </div>
                        <div className='col-2'>
                            <input type='text' className='ml-6' name='nome' value={vaga.nome} onChange={handleChange}></input>

                        </div>

                    </div>

                    <div className='row mt-2'>

                        <div className='col-1'>
                            <label>
                                Descrição:
                            </label>
                        </div>
                        <div className='col-2'>
                            <input type="text" className='ml-6' name='descricao' value={vaga.descricao} onClick={handleChange}></input>
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-1'>
                            <label>Candidato:</label>
                        </div>
                        <div className='col-2'>
                            <input type="text" className='ml-6' name='candidato' value={vaga.candidato}></input>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};


