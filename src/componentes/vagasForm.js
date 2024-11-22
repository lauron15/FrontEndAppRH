import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialVaga = {
    id: 0,
    nome: '',
    descricao: ''
};

export const VagasForm = () => {
    const [vaga, setVaga] = useState(initialVaga);
    const [loading, setLoading] = useState(false);

    const { vagasId } = useParams(); // Pega o parâmetro da URL
    const navigate = useNavigate();

    const carregarVagas = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/vaga/${vagasId}`);
            if (!response.ok) throw new Error('Erro ao carregar vaga');
            const data = await response.json();
            setVaga(data); // Atualiza o estado corretamente
        } catch (error) {
            toast.error("Houve um erro ao carregar as Vagas.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVaga((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const salvarVaga = async () => {
        const method = vagasId && vagasId !== "0" ? 'PUT' : 'POST';
        const url = vagasId && vagasId !== "0" ? `/api/vaga/${vagasId}` : '/api/vaga';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vaga),
            });

            if (!response.ok) throw new Error('Erro ao salvar vaga');
            toast.success("Vaga salva com sucesso!");
            navigate('/vagas');
        } catch (error) {
            toast.error("Houve um erro ao salvar a vaga.");
        }
    };

    const deletarVaga = async () => {
        if (window.confirm('Tem certeza que deseja deletar essa vaga?')) {
            try {
                const response = await fetch(`/api/vaga/${vagasId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) throw new Error('Erro ao deletar vaga');
                toast.success("Vaga deletada com sucesso!");
                navigate('/vagas');
            } catch (error) {
                toast.error("Houve um erro ao deletar a vaga.");
            }
        }
    };

    useEffect(() => {
        if (vagasId && vagasId !== "0") carregarVagas();
    }, [vagasId]);

    return (
        <div className='row'>
            <div className='col'>
                <h2>{vagasId && vagasId !== "0" ? "Editar vaga" : "Criar vaga"}</h2>
            </div>

            {vagasId && vagasId !== "0" && (
                <div className='row'>
                    <div className='col'>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-2 col-form-label">Id</label>
                            <div className="col-6">
                                <input type='text' className='form-control' disabled value={vaga.id} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="nome" className="col-2 col-form-label">Nome</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="nome" value={vaga.nome} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col'>
                    <div className="form-group row">
                        <label htmlFor="descricao" className="col-2 col-form-label">Descrição</label>
                        <div className="col-6">
                            <input type='text' className='form-control' name="descricao" value={vaga.descricao} onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col-1'>
                    <button className='btn btn-success mr-2' onClick={salvarVaga} disabled={loading}>
                        {vagasId && vagasId !== "0" ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
                <div className='col'>
                    {vagasId && vagasId !== "0" && (
                        <button className='btn btn-outline-danger ml-2' onClick={deletarVaga} disabled={loading}>
                            Deletar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
