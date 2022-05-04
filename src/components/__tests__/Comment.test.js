import { render, screen } from '@testing-library/react';
import Comment from '../Comment';
import renderer from 'react-test-renderer';
test('should render Comment Panel', () => {
    const data = {
        picture_url: "no pic",
        message: 'no msg'
    }
    render(<Comment data={data} />)
    const text = screen.queryByTestId('userCommentPic').src;
    const text1 = screen.queryByTestId('cmnt').innerHTML;
    const component = renderer.create(<Comment data={data} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
    expect(text).toBe("http://localhost/no%20pic");
    expect(text1).toBe("no msg");
})
