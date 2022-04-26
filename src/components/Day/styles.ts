import styled from 'styled-components';
type ContainerProps = {
    isValidDay: boolean,
    isWeekendDay: boolean,
    hasReminder: boolean
}
export const Container = styled.li<ContainerProps>`
    display: flex;
    flex-direction: column;
    list-style: none;
    font-size: calc(16px + ((100vw - 300px) / 130));
    background-color: ${({ isWeekendDay }) => isWeekendDay ? '#eaeaea' : '#ffffff'};
    border: 1px solid var(--text-body);
    height: 16vw;
    max-height: 95px; 
    @media all and (max-width: 800px) {
        height: 10vh;
        max-height: 100%; 
    }
    color: ${({ isWeekendDay, isValidDay }) =>
        isWeekendDay && isValidDay ?
            '#4682B4'
            : !isValidDay ?
                '#969cb3' : '#000'
    };
    cursor: ${({ isValidDay, hasReminder }) => isValidDay && hasReminder ? 'pointer' : 'not-allowed'};
    span{
        margin-left: 0;
        padding-left: 0.7em;
    }

    div{
        margin: 0 auto;
        overflow: hidden;
        max-height: 11vh;
        div {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            max-width: 10vw;
            font-size: calc(3px + ((100vw - 300px) / 130));
            white-space: nowrap;
            overflow: hidden;
            text-overflow: "----";
            background-color: yellow;
            border-radius: 0.40rem;
            padding-left: 3px;
            color: #000;
            &+div{
                margin-top: 2px;     
            }
            @media all and (max-width: 800px) {
                font-size: calc(10px + ((100vw - 300px) / 130))
            }
        }
    }
    
`

export const ReminderList = styled.ul`
    display: flex;
    width: 100%;
    /* height: 70vh; */
    max-height: 40vh;
    flex-direction: column;
    justify-content: flex-start;
    align-content: space-between;
    overflow-y: scroll;
    
`

export const ReminderListElement = styled.li<{ colorCard: string }>`
    display: flex;
    flex-direction:column;
    align-items: center;
    align-content: center;
    justify-content: center;
    list-style: none;
    background: ${props => props.colorCard};
    font-size: calc(13px + ((100vw - 300px) / 130));
    margin-top: 2rem;
    border-radius: 0.40rem;
    height: 8rem;
    
`

export const HeadElement = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
   
    p{
        margin: 1rem 2rem;
    }
    div{
        margin: 1rem 2rem;
        display: flex;
        justify-content: flex-end;
        button {
            &+button{
                margin-left: 1rem;
            }
        }
    }
    @media all and (max-width: 800px) {
        p,div{
            margin: 0;
            margin-top: 1rem;
        }
        p{
            margin-left: 1rem;
        }
    }
    button{
        font-size: 1rem;
        border: 0;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        background: transparent;
        height: 1rem;
        transition: filter 0.2s;
        &:hover {
            filter: brightness(0.9);
        }
    }
    
`
export const BodyElement = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    h2{
        float: left;
        padding-left: 2rem;
        font-size: calc(13px + ((100vw - 300px) / 130));
    }
    @media all and (max-width: 800px) {
        h2{ 
        padding-left: 1rem;
    }
    }
    h5{
        font-size: calc(9px + ((100vw - 300px) / 130));
        margin-right: 1rem;
    }
    
`
