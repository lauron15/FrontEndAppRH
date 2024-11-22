import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

export const Vagas = () => {

    const [vagas, setVagas] = useState([]); // Inicialize como array
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        carregarVaga();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'descricao', headerName: 'Descrição', width: 200 },

    ];

    return (
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
            <div style={{ marginLeft: '20px' }}>
                <button
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007BFF',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                    onClick={() => console.log('Botão clicado')}
                >
                    Cadastrar Vagas
                </button>
            </div>
        </div>
    );
};

export default Vagas;