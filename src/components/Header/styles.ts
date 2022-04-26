import styled from 'styled-components';

export const Container = styled.header`
    background: var(--text-title);
`

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 1rem 1rem 1rem; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1{
        color: var(--shape);
    }

    button{
        font-size: 1rem;
        border: 0;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #4682B4;
        padding: 0 1rem;
        border-radius: 0.25rem;
        height: 3rem;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }
`

