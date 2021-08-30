import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Image } from 'react-bootstrap';

export const FAUserIcon = styled(FontAwesomeIcon)<{ siz: string }>`
    font-size: ${(props) => props.siz};
    margin-right: 5px;
`;

export const UserProfileImg = styled(Image)<{ size: string }>`
    width: ${(props) => props?.size};
    height: ${(props) => props?.size};
    margin-right: 5px;
    object-fit: cover;
`;
