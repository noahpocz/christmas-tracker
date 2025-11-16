import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const _s = {
    Container: styled.div`
        height: ${(props) => props.isOpen ? `${props.height}px` : 0};
        transition: height 0.3s;
        
        overflow: hidden;
    `
}

export const Collapse = ({ children, isOpen }) => {
    const [elemHeight, setElemHeight] = useState(0)
    const containerRef = useRef(null);

    useEffect(() => {
        setElemHeight(containerRef.current.clientHeight);
    }, [])

    return (
        <_s.Container isOpen={isOpen} height={elemHeight}>
            <div ref={containerRef}>
                {children}
            </div>
        </_s.Container>
    )
}
