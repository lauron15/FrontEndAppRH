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

    const validate = () => {
        if (!vaga.rg) {
            toast.error('Informe o RG');
            return false;
        }
        if (!vaga.nomevaga) {
            toast.error('Informe o nome da vaga');
            return false;
        }
        if (vaga.candidatoId === 0) {
            toast.error('Informe qual candidato irá ocupar a vaga');
            return false;
        }
        return true;
    };

    const carregarVaga = () => {
        try {
            setLoading(true);
            const response = fetch(`/api/vaga/${vagaId}`);
            if (!response.ok) throw new Error('Erro ao carregar vaga');
            const data = response.json();
            setVaga(data);
        } catch (error) {
            toast.error('Houve um erro ao carregar as vagas');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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

            if (!response.ok) throw new Error('Erro ao salvar vaga');

            toast.success('Vaga cadastrada com sucesso!');
            navigate('/vaga');
        } catch (error) {
            toast.error('Houve um erro ao cadastrar a vaga');
        }
    };

    const deletarVaga = async () => {
        if (window.confirm('Tem certeza que deseja deletar a vaga?')) {
            try {
                const response = await fetch(`/api/vaga/${vagaId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Erro ao deletar vaga');

                toast.success('Vaga deletada com sucesso!');
                navigate('/vaga');
            } catch (error) {
                toast.error('Houve um erro ao deletar a vaga');
            }
        }
    };

    useEffect(() => {
        if (vagaId != null && vagaId !== '0') {
            carregarVaga();
        }
    }, [vagaId]);

    return (
        <div className="row">
            <div className="col">
                <h2>{vagaId !== '0' ? 'Editar vaga' : 'Criar vaga'}</h2>
            </div>

            {vagaId !== '0' && (
                <div className="row">
                    <div className="col">
                        <div className="form-group row">
                            <label htmlFor="id" className="col-2 col-form-label">
                                Id
                            </label>
                            <div className="col-6">
                                <input type="text" className="form-control" disabled value={vaga.id} />
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
                                value={vaga.rg}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col">
                    <div className="form-group row">
                        <label htmlFor="nomevaga" className="col-2 col-form-label">
                            Nome da Vaga
                        </label>
                        <div className="col-6">
                            <input
                                type="text"
                                className="form-control"
                                name="nomevaga"
                                value={vaga.nomevaga}
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
                            {/* <BuscarItem
                                path="api/candidato"
                                placeholder="Informe o candidato"
                                recebeItem={(data) => {
                                    if (data) handleChange({ target: { value: data.id, name: 'candidatoId' } });
                                }}
                                idItem={vaga.candidatoId}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-1">
                    <button className="btn btn-success mr-2" onClick={salvarVaga} disabled={loading}>
                        {vagaId !== '0' ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
                <div className="col">
                    {vagaId !== '0' && (
                        <button className="btn btn-outline-danger ml-2" onClick={deletarVaga} disabled={loading}>
                            Deletar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

