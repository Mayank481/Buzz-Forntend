import { render, screen } from '@testing-library/react';
import Userprofile from "../Userprofile";
import renderer from 'react-test-renderer';


test('should render Userprofile Panel', () => {
  const user = { firstname: "kumar", lastname: "prashant", friends: { myFriends: [], mySentRequests: [{}] } };
  const SFriend = [];
  const toggleRefresh = () => setRefresh((p) => !p);
   render(<Userprofile
    myData={user}
    suggestFriend={SFriend}
    refresh={toggleRefresh}
  />)
  const text = screen.queryByTestId('userfullname').innerHTML;
  expect(text).toBe("Unknown User");

  const component = renderer.create(<Userprofile
    myData={user}
    suggestFriend={SFriend}
    refresh={toggleRefresh}
  />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})