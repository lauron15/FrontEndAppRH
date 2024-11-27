import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';


export const Vagas = () => {

    const [vagas, setVagas] = useState([]); // Inicialize como array
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const carregarVaga = () => {
        setLoading(true);
        fetch('/api/vaga')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na resposta do servidor");
                }
                return response.json();
            })
            .then(data => {
                setVagas(data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Houve um erro ao carregar os Candidatos");
                setLoading(false);
            });
    };

    const RedirecionarCadastroVagas = () => {
        navigate("/cadastrarVagas");
    }

    useEffect(() => {
        carregarVaga();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'descricao', headerName: 'Descrição', width: 200 },

    ];

    return (

        <div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2>Vagas</h2>
                        <Button
                            className="btn btn-outline-primary"
                            onClick={RedirecionarCadastroVagas}
                        >
                            Cadastrar Vagas
                        </Button>
                    </div>
                </div>
            </div>

            <div style={{ height: 400, width: '100%' }}>
                {loading ? (
                    <p>Carregando...</p>
                ) : (
                    <DataGrid
                        rows={vagas}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick

                    />

                )}

            </div>
        </div>
    );
};

export default Vagas;