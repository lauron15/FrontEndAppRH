import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BuscarItem from '../Utils/BuscarItem';

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
        if (candidatoId && candidatoId !== '0') {
            carregarCandidato();
        }
    }, [candidatoId]);

    return (
        <div className="row">
            <div className="col">
                <h2>{candidatoId !== '0' ? 'Editar candidato' : 'Criar candidato'}</h2>
            </div>

            {candidatoId !== '0' && (
                <div className="row">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="id" className="col-2 col-form-label">
                                Id
                            </label>
                            <div className="col-6">
                                <input type="text" className="form-control" disabled value={candidato.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row mt-3">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="rg" className="col-2 col-form-label">
                            RG
                        </label>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                name="rg"
                                value={candidato.rg}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="nomecandidato" className="col-2 col-form-label">
                            Nome do Candidato
                        </label>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                name="nomecandidato"
                                value={candidato.nomecandidato}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="vagaId" className="col-2 col-form-label">
                            Vaga
                        </label>
                        <div className="col-6">
                            <BuscarItem
                                path="api/vaga"
                                placeholder="Informe a vaga"
                                recebeItem={(data) => {
                                    if (data) handleChange({ target: { value: data.id, name: 'vagaId' } });
                                }}
                                idItem={candidato.vagaId}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-1">
                    <button className="btn btn-success mr-2" onClick={salvarCandidato} disabled={loading}>
                        {candidatoId !== '0' ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
                <div className="col">
                    {candidatoId !== '0' && (
                        <button className="btn btn-outline-danger ml-2" onClick={deletarCandidato} disabled={loading}>
                            Deletar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
