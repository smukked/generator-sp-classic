/// <reference types="jest" />

import {<%= project %>Flux} from './<%= project %>Flux';
import * as React from "react";
import {shallow} from 'enzyme';
import { StateActions } from '../Actions/StateActions';

jest.mock('../Services/<%= project %>Service');


describe('<%= project %>Flux component' , () => {
    
    let <%= projectLower %>Flux = shallow(<<%= project %>Flux />);
    
    afterAll(() => {
        let component = (<%= projectLower %>Flux.instance() as <%= project %>Flux);
        component.componentWillUnmount();
    });

    it('should exist', () => {
        expect(<%= projectLower %>Flux).toBeDefined();
    });

    it('should be empty', () => {
        const pages = <%= projectLower %>Flux.find(".<%= projectLower %>-flux-list li").length;
        expect(pages).toBe(0);
    });

    it('should contain 2 pages', () => {
        StateActions.getPages("Pages").then((_) => {
            const pages = <%= projectLower %>Flux.find(".<%= projectLower %>-flux-list li").length;
            expect(pages).toBe(2);
        });
    });

});