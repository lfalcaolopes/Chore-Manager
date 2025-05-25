'use client';

import styled from 'styled-components';
import React from 'react';

interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  label?: string;
  className?: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  background-color: #fff;
  color: #111827;
  border: 1px solid #d1d5db;
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

const Select = <T extends string>({
  value,
  onChange,
  options,
  label,
  className = '',
}: SelectProps<T>) => {
  return (
    <Wrapper className={className}>
      {label && <Label>{label}</Label>}
      <StyledSelect value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </Wrapper>
  );
};

export default Select;
