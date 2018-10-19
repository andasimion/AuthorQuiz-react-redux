import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme , {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter() });

state = {
  turnData: {
    books: ['The Shinning', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet'],
    author: {
      name: 'Charles Dickens',
      imageURL: 'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfiel', 'A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state onAnswerSelected={() => {}}} />, div);
  });



  describe("When no answer has been selected", () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mount(<AuthorQuiz { ...state } onAnswerSelected={()=>{}} />);
    });

    it("should have no color", () => {
      expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe("");
    });
  });

    describe("when the wrong answer has been selected", () => {
      let wrapper;

      beforeAll(() => {
        wrapper = mount(
          <AuthorQuiz {...(Object.assign({}, state, { highlight: 'wrong' }))} onAnswerSelected={()=>{}} />
        );
      });

      it('should have red color', () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
      });
    });

    describe("when the correct answer has been selected", () => {
      let wrapper;

      beforeAll(() => {
        wrapper = mount(
          <AuthorQuiz {...(Object.assign({}, state, { highlight: 'correct' }))} onAnswerSelected={()=>{}} />
        );
      });

      it('should have green color', () => {
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
      });
    });  

    describe("when the first answer has been selected", () => {
      let wrapper;
      let handleAnswerSelected = jest.fn();

      beforeAll(() => {
        wrapper = mount(
          <AuthorQuiz { ...state } onAnswerSelected={handleAnswerSelected} />
        );
        wrapper.find(".answer").first().simulate('click');
      });

      it('onAnswerSelected should be called', () => {
        expect(handleAnswerSelected).toHaveBeenCalled();
      });

      it('the passed argument should be the Shining', () => {
        expect(handleAnswerSelected).toHaveBeenCalledWith('The Shining');
      });
    });
});