import React from 'react';
    import { render, screen, fireEvent, waitFor } from '@testing-library/react';
    import ModelSelection from '../components/ModelSelection';

    describe('ModelSelection', () => {
      const mockApiKey = 'test-api-key';
      const mockOnChange = jest.fn();

      beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
      });

      test('renders with loading state', async () => {
        render(<ModelSelection apiKey={mockApiKey} onModelChange={mockOnChange} />);
        expect(screen.getByText('Select a model')).toBeInTheDocument();
      });

      test('displays error when API key is invalid', async () => {
        render(<ModelSelection apiKey="" onModelChange={mockOnChange} />);
        await waitFor(() => {
          expect(screen.getByText('Failed to load models')).toBeInTheDocument();
        });
      });

      test('displays models from cache', async () => {
        const cachedModels = [
          {
            name: 'models/gemini-pro',
            displayName: 'Gemini Pro',
            description: 'General purpose model',
            inputTokenLimit: 30720,
            outputTokenLimit: 2048,
            supportedGenerationMethods: ['generateContent']
          }
        ];
        localStorage.setItem('geminiModels', JSON.stringify(cachedModels));
        localStorage.setItem('geminiModelsTimestamp', Date.now().toString());

        render(<ModelSelection apiKey={mockApiKey} onModelChange={mockOnChange} />);
        
        fireEvent.click(screen.getByText('Select a model'));
        await waitFor(() => {
          expect(screen.getByText('Gemini Pro')).toBeInTheDocument();
          expect(screen.getByText('General purpose model')).toBeInTheDocument();
          expect(screen.getByText('Tokens: 30720 in / 2048 out')).toBeInTheDocument();
        });
      });

      test('handles model selection', async () => {
        const cachedModels = [
          {
            name: 'models/gemini-pro',
            displayName: 'Gemini Pro',
            description: 'General purpose model',
            inputTokenLimit: 30720,
            outputTokenLimit: 2048,
            supportedGenerationMethods: ['generateContent']
          }
        ];
        localStorage.setItem('geminiModels', JSON.stringify(cachedModels));
        localStorage.setItem('geminiModelsTimestamp', Date.now().toString());

        render(<ModelSelection apiKey={mockApiKey} onModelChange={mockOnChange} />);
        
        fireEvent.click(screen.getByText('Select a model'));
        await waitFor(() => {
          fireEvent.click(screen.getByText('Gemini Pro'));
          expect(mockOnChange).toHaveBeenCalledWith('models/gemini-pro');
        });
      });
    });
