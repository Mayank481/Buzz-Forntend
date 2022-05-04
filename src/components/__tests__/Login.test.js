import { render, screen, fireEvent } from '@testing-library/react';
import Login from "../Login";
import renderer from 'react-test-renderer';
test('should render Login Panel', () => {
  render(<Login />)
  const email_input = screen.queryByTitle('email-id');
  const pass_input = screen.queryByTitle('password');
  const loginBtn = screen.queryByTitle('login-btn');
  const gAuthBtn = screen.queryByTitle('gAuthBtn');
  expect(gAuthBtn).toBeTruthy();
  expect(email_input).toBeTruthy();
  expect(pass_input).toBeTruthy();
  expect(loginBtn).toBeTruthy();

  const component = renderer.create(<Login />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot();
})
describe('Change login Fields Inputs', () => {
  it('onChange', () => {
    render(<Login />);
    const email_input = screen.queryByTitle('email-id');
    const pass_input = screen.queryByTitle('password');
    fireEvent.change(email_input, { target: { value: 'abc@tothenew.com' } });
    fireEvent.change(pass_input, { target: { value: 'abc123@com' } });
    expect(email_input.value).toBe('abc@tothenew.com');
    expect(pass_input.value).toBe('abc123@com');

    const component = renderer.create(<Login />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
  });
});