import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';

export const Candidatos = () => {
    const [candidatos, setCandidatos] = useState([]); // Inicialize como array
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const carregarCandidato = () => {
        setLoading(true);
        fetch('/api/candidato')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro na resposta do servidor");
                }
                return response.json();
            })
            .then(data => {
                setCandidatos(data); // Corrija a função para usar setCandidatos
                setLoading(false);
            })
            .catch(() => {
                toast.error("Houve um erro ao carregar os Candidatos");
                setLoading(false);
            });
    };

    const RedirecionarCadastroCandidato = () => {
        navigate("/cadastrarCandidato");
    }

    useEffect(() => {
        carregarCandidato(); // Carregar candidatos ao montar o componente
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'rg', headerName: 'RG', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        // Adicione outras colunas conforme necessário
    ];


    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="d-flex align-items-center justify-content-between">
                        <h2>Candidatos</h2>
                        <Button
                            className="btn btn-outline-primary"
                            onClick={RedirecionarCadastroCandidato}
                        >
                            Cadastrar Candidatos
                        </Button>
                    </div>
                </div>
            </div>

            <div className='row mt-3'>
                <div className='col'>

                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        <DataGrid
                            rows={candidatos}
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
        </div>
    );
};

export default Candidatos;
