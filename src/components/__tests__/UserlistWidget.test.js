import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserlistWidget from "../UserlistWidget";
import renderer from 'react-test-renderer';



test('should render UserlistWidget Panel', () => {
  const user = { friends: { myFriends: [], mySentRequests: [{}] }, suggestFriend: [{ firstname: "kumar", lastname: "kumar" }] };

  const toggleRefresh = () => setRefresh((p) => !p);
  render(<BrowserRouter> <UserlistWidget
    title={'Friends Sugesstions'}
    friendList={user.suggestFriend}
    ifEmpty="No Suggestions found"
  /> </BrowserRouter>)
  const text = screen.queryByTestId('friendName').innerHTML;
  expect(text).toBe("kumar kumar");

  const component = renderer.create(<BrowserRouter> <UserlistWidget
    title={'Friends Sugesstions'}
    friendList={user.suggestFriend}
    ifEmpty="No Suggestions found"
  /> </BrowserRouter>)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();

})