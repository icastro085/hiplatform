import styled from 'styled-components';

export const ListItem = styled.li`
  display: flex;
  padding: 5px 0;
  flex-direction: column;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ListItemContainer = styled.div`
  padding: 8px 24px;
  border-radius: 2px;

  &:hover {
    background-color: var(--grey);
  }
`;
