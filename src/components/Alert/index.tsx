import { ReactNode } from 'react';
import { transitions, positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 6000,
    offset: '30px',
    transition: transitions.SCALE
}

type AlertProviderProps = {
    children: ReactNode;
}
export const AlertProvider = ({ children }: AlertProviderProps) => {
    return (
        <Provider template={AlertTemplate} {...options}>
            {children}
        </Provider>
    )
}