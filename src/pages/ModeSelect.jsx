import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

import { useMode } from '../hooks/useMode';

import RejectMode from '../components/mode/RejectMode';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import TableBarIcon from '@mui/icons-material/TableBar';

function ModeSelect({ }) {
    const { mode, setMode, table, setTable } = useMode();

    const [qrCode, setQrCode] = useState(null);
    const [shouldSetTable, setShouldSetTable] = useState(false);

    function handleModePick(selectedMode) {
        if (selectedMode === 'table') {
            setShouldSetTable(true);
        } else {
            setMode(selectedMode);
        }
    }

    useEffect(() => {
        if (qrCode !== null) {
            setTable(qrCode);
            setMode('table');
            setShouldSetTable(false);
        }
    }, [qrCode]);

    console.log('mode', mode);
    console.log('table', table);
    console.log('shouldSetTable', shouldSetTable);
    console.log('qrCode', qrCode);
    console.log('----------------');

    return (
        <RejectMode>
            <div className="mode-select">
                <Typography
                    variant="h4"
                    noWrap
                    sx={{ mt: 3 }}
                >
                    Bem vindo!
                </Typography>

                <Typography paragraph sx={{ mb: 8 }}>
                    Você está aqui com a gente, ou quer receber seu pedido em casa?
                </Typography>

                <Button onClick={() => handleModePick("table")} variant="contained" size="large" color="primary" startIcon={<TableBarIcon />}>
                    Estou sentado em uma mesa
                </Button>

                <Typography
                    variant="h4"
                    noWrap
                    sx={{ mt: 3 }}
                >
                    - ou -
                </Typography>

                <Button onClick={() => handleModePick("delivery")} variant="contained" size="large" color="secondary" startIcon={<LocalShippingIcon />}>
                    Quero receber em casa
                </Button>

                <Paper
                    sx={{ padding: 1, position: 'fixed', bottom: 0, left: 0, right: 0, alignItems: 'center' }}
                    elevation={1}
                >
                    <Typography sx={{ fontSize: 14 }}>Rua dos Bobos, numero 0 - Bairro, Cidade - 123456-123</Typography>
                </Paper>
            </div>

            {shouldSetTable && (
                <div className="camera">
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                setQrCode(result?.text);
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: '100%' }}
                    />
                </div>
            )}
        </RejectMode>
    );
}

export default ModeSelect;