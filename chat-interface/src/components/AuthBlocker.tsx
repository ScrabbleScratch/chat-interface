import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type AuthBlockerState = {
    value: string,
    valid: boolean|undefined,
    allowed: boolean,
};

type AuthBlockerProps = {
    required?: boolean,
    label: string,
    onSubmit: (value: string) => void,
    children: JSX.Element,
};

const AuthBlocker: React.FC<AuthBlockerProps> = (props) => {
    const [state, setState] = useState<AuthBlockerState>({
        value: "",
        valid: undefined,
        allowed: false,
    })

    const onKeySubmit = () => {
        if (props.required) {
            if (state.value.trim().length > 0) {
                setState({...state, valid: true});
                props.onSubmit(state.value);
                setState({...state, allowed: true});
            } else setState({...state, valid: false});
        } else setState({...state, allowed: true});
    };

    const onEnterPress = (k: any) => {
        // console.log('Key pressed:', k.keyCode);
        if (k.keyCode === 13) onKeySubmit();
    };

    return (
        state.allowed ? props.children :
            <Container sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{
                        height: '20%',
                        width: {
                            xs: '100%',
                            md: '35%',
                        },
                        padding: 2,
                        backgroundColor: '#393E46',
                        border: 1,
                        borderRadius: 5,
                        borderColor: '#B2B2B2',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Stack sx={{
                            width: '100%',
                        }}
                    >
                        <TextField autoFocus
                            fullWidth
                            required
                            label={props.label}
                            value={state.value}
                            onChange={v => setState({...state, value: v.target.value})}
                            onKeyUp={onEnterPress}
                            error={state.valid ?? false}
                            sx={{
                                marginBottom: 2,
                            }}
                        />
                        <Button variant='outlined'
                            color='warning'
                            type='submit'
                            onClick={onKeySubmit}
                        >
                            SUBMIT
                        </Button>
                    </Stack>
                </Box>
            </Container>
    );
};

export default AuthBlocker;