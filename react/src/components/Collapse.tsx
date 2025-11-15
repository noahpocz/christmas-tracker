import React, { useState } from 'react';
import styled from '@emotion/styled';

const _s = {
    Container: styled.div`
        height: ${(props) => props.isOpen ? 'min-content' : '0'};
        transition: height 0.3s;
        
        overflow: hidden;
    `
}

export const Collapse = ({ children, isOpen }) => {
    return (
        <_s.Container isOpen={isOpen}>
            {children}
        </_s.Container>
    )
}
