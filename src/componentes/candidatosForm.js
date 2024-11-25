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
            if (!response.ok) throw new Error('Erro ao carregar candidato');
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

            if (!response.ok) throw new Error('Erro ao salvar candidato');

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
                if (!response.ok) throw new Error('Erro ao deletar candidato');

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
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col text-center">
                    <h2>{candidatoId !== '0' ? 'Atualizar Candidato' : 'Criar Candidato'}</h2>
                </div>
            </div>

            {candidatoId !== '0' && (
                <div className="row mb-3">
                    <div className="col text-center">
                        <label htmlFor="id" className="form-label">
                            Id do Candidato
                        </label>
                        <input
                            type="text"
                            className="form-control w-50 mx-auto"
                            id="id"
                            disabled
                            value={candidato.id}
                        />
                    </div>
                </div>
            )}

            <div className="row mb-3">
                <div className="col text-center">
                    <label htmlFor="rg" className="form-label">
                        RG do Candidato
                    </label>
                    <input
                        type="text"
                        className="form-control w-50 mx-auto"
                        id="rg"
                        name="rg"
                        value={candidato.rg}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col text-center">
                    <label htmlFor="nomecandidato" className="form-label">
                        Nome do Candidato
                    </label>
                    <input
                        type="text"
                        className="form-control w-50 mx-auto"
                        id="nomecandidato"
                        name="nomecandidato"
                        value={candidato.nomecandidato}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row mb-4 text-center">
                <div className="col">
                    {/* Placeholder para componente adicional */}
                </div>
            </div>

            <div className="row text-center">
                <div className="col">
                    <button
                        className="btn btn-success me-3"
                        onClick={salvarCandidato}
                        disabled={loading}
                    >
                        {candidatoId !== '0' ? 'Atualizar' : 'Salvar'}
                    </button>
                    {candidatoId !== '0' && (
                        <button
                            className="btn btn-danger"
                            onClick={deletarCandidato}
                            disabled={loading}
                        >
                            Deletar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
