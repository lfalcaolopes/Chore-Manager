'use client';

import styled from 'styled-components';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Wrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  background-color: #fff;
  border: 1px solid ${({ hasError }) => (hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition:
    border 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #ef4444;
`;

const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <Wrapper className={className}>
      {label && <Label>{label}</Label>}
      <StyledInput hasError={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

export default Input;
