import styled from 'styled-components';
import {darken} from 'polished';

export const PrimaryButton = styled.button`
  padding: 0 15px;
  height: 35px;
  border: 0;
  border-radius: 4px;
  margin-right: 5px;
  color: #fff;
  background: #ee4d64;

  display: flex;
  align-items: center;
  transition: background 0.2s;
  &:hover {
    background: ${darken(0.03, '#ee4d64')};
  }
  svg {
    margin-right: 5px;
  }
  span {
    flex: 1;
    text-align: center;
    font-weight: bold;
  }
`;

export const SecondaryBytton = styled(PrimaryButton)`
  background: #c5c5c5;
  &:hover {
    background: ${darken(0.03, '#c5c5c5')};
  }
`;
