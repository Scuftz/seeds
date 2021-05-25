import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Analyst from './components/Analyst';
import ShowArticleList from './components/ShowArticleList';
import SubmitArticle from './components/SubmitArticle';

test('renders search page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search for an Article/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders analyst page', () => {
  render(<BrowserRouter><Analyst/></BrowserRouter>);
  const linkElement = screen.getByText(/Analyst Page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders moderator page', () => {
  render(<BrowserRouter><ShowArticleList/></BrowserRouter>);
  const linkElement = screen.getByText(/Moderator Page/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders submit page', () => {
  render(<BrowserRouter><SubmitArticle/></BrowserRouter>);
  const linkElement = screen.getByText(/Submit Article/i);
  expect(linkElement).toBeInTheDocument();
});