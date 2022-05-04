import { render, screen } from '@testing-library/react';
import Feeds from "../Feeds";
import renderer from 'react-test-renderer';
test('should render Feeds Panel', () => {
    const user = { firstname: "noOne", lastname: "noOne", friends: { myFriends: [], mySentRequests: [{}] } };
    const SFriend = [];
   const{debug}= render(<Feeds user={user} suggestFriend={SFriend} />)
   debug();
    const text = screen.queryByTestId('userProName').innerHTML;
    expect(text).toBe("noOne noOne");

    const component = renderer.create(<Feeds user={user} suggestFriend={SFriend} />)
        let tree = component.toJSON()
        expect(tree).toMatchSnapshot();

      
    
    

})