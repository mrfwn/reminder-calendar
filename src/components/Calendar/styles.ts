import styled from 'styled-components';

export const Table = styled.div`
    margin-top: 1em;
`;

export const TableHead = styled.ul`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0 auto;
    max-width: 64em;
    padding: 0;
    margin-bottom: 0em;
    background: #4682B4;
    color: #ffffff;
`

export const TableHeadElement = styled.li`
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;
    margin-left: 0;
    font-size: calc(13px + ((100vw - 300px) / 130));
    height: 4vw;

    abbr[title] {
        border: none;
        font-weight: 800;
        text-decoration: none;
    }
    
    @media all and (max-width: 800px) {
        font-size: 0;
        abbr:after{
            content: attr(title);
            font-size: calc(13px + ((100vw - 300px) / 130));
            text-align: center;
        }
    }
`

export const TableContent = styled.ol`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin: 0 auto;
    max-width: 64em;
    padding: 0;
`