import { render, screen} from '@testing-library/react';
import Admin from '../Admin';
import renderer from 'react-test-renderer';
test('should render Admin Panel', () => {
    render(<Admin />)
    const component = renderer.create(<Admin />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot();
    const text = screen.queryByTestId('reportedPosts').innerHTML;
    expect(text).toBe("No any posts");
})
