import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

export const Candidatos = () => {
    const [candidatos, setCandidatos] = useState([]); // Inicialize como array
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        carregarCandidato(); // Carregar candidatos ao montar o componente
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'rg', headerName: 'RG', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        // Adicione outras colunas conforme necessário
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
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
                    Cadastrar Candidatos
                </button>
            </div>
        </div>
    );
};

export default Candidatos;
