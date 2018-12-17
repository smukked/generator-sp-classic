import * as React from "react";
import "./<%= project %>Flux.module.scss";
import { StateStor } from "../Stores/StateStor";
import PageModel from "../Models/PageModel";

export interface I<%= project %>FluxState {
    loading: boolean;
    pages: PageModel[];
}

export class <%= project %>Flux extends React.Component<any, I<%= project %>FluxState> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            pages: []
        };
    }

    private onStorChange = () => {
        this.setState({
            pages: StateStor.getPages(),
            loading: StateStor.isLoading()
        });
    }

    public componentWillMount() {
        // Add Stor listener
        StateStor.addChangeListener(this.onStorChange);
    }
    
    public componentWillUnmount() {
        // Remove Stor listener
        StateStor.removeChangeListener(this.onStorChange);
    }

    public render() {
        return (
            <div className="<%= projectLower %>-flux">
                <h2>Flux:</h2>
                <div className="<%= projectLower %>-flux-loading" style={this.state.loading ? { display: "block" } : { display: "none" }}>Loading...</div>
                <ul className="<%= projectLower %>-flux-list" style={this.state.loading ? { display: "none" } : { display: "block" }}>
                {this.state.pages.map((page: PageModel, index: number) => {
                    return <li key={index}><strong>{page.Id}</strong> {page.Title}</li>;
                })}
                </ul>
            </div>
        );
    }
}

export default <%= project %>Flux;