import { render, screen } from '@testing-library/react';
import Friends from "../Friends";
import renderer from 'react-test-renderer';
test('should render Friends Panel', () => {
    const user = { friends: { myFriends: [], mySentRequests: [{}], myFriendRequests: [{ firstname: "testing", lastname: "testing" }] } };
    const toggleRefresh = () => setRefresh((p) => !p);
    render(<Friends user={user} refresh={toggleRefresh} />)
    const text = screen.queryByTestId('friendRequestUser').innerHTML;
    expect(text).toBe("testing testing");

    const component = renderer.create(<Friends user={user} refresh={toggleRefresh} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
})