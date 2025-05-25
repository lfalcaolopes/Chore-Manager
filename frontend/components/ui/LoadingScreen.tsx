'use client';

import styled from 'styled-components';

const LoadingContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  font-size: 1.25rem;
  color: #4b5563;
`;

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = 'Carregando...' }: LoadingScreenProps) => {
  return (
    <LoadingContainer>
      <LoadingContent>
        <Spinner />
        <LoadingText>{message}</LoadingText>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;
