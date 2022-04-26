import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2rem;

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
        width: 25rem;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }
`

export const ModalContainer = styled.form`
    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input {
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background: #e7e9ee;
        font-weight: 400;
        font-size: 1rem;

        &::placeholder {
            color: var(--text-body)
        }
        &+ input {
            margin-top: 1rem;
        }
    }
`

export const GroupContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    &+div{
        margin-top: 2rem;
    }
    h3{
        margin-right: 1rem;
    }
    input{
        margin-right:1rem;
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
        height: 4rem;
        width: 10rem;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }

    @media all and (max-width: 800px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button{
            margin-top: 1rem;
        }
    }
`