/// <reference types="jest" />

import {<%= project %>Pages, I<%= project %>PagesState} from './<%= project %>Pages';
import * as React from "react";
import {shallow} from 'enzyme';

jest.mock('../Services/<%= project %>Service');

describe('<%= project %>Pages component' , () => {
    
    let <%= projectLower %>Pages = shallow(<<%= project %>Pages listName="Pages" />);

    afterAll(() => {
        <%= projectLower %>Pages.find("#buttonServer").simulate('click');
        <%= projectLower %>Pages.find("#buttonLocal").simulate('click');
    });

    it('should exist', () => {
        expect(<%= projectLower %>Pages).toBeDefined();
    });

    it('should contain 2 pages', () => {
        const pages = <%= projectLower %>Pages.find(".<%= projectLower %>-pages-list li").length;
        expect(pages).toBe(2);
    });

    it('should reload from server', () => {
        let component = (<%= projectLower %>Pages.instance() as <%= project %>Pages);
        expect.assertions(1);
        component.reload(true).then(_ => {
            expect(component.state.from).toBe("server");
        });
    });

    it('should reload from local storage', () => {
        let component = (<%= projectLower %>Pages.instance() as <%= project %>Pages);
        expect.assertions(1);
        component.reload(false).then(_ => {
            expect(component.state.from).toBe("local storage");
        });
    });

});