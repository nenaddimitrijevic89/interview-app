import React from "react";
import { serviceReports } from "../../../services/fetchReports";
import { Header } from "../../Header/Header";
import { Container } from "react-materialize";
import { Report } from "./Report/Report";
import { Authentication } from "../../../services/AuthenticationService";
import { search } from "../../../shared/utilities";
import { Search } from "../../Search/Search";
import { Loading } from "../../Loading/Loading";
import style from './Reports.module.css';

class Reports extends React.Component {
    constructor() {
        super();
        this.state = {
            reports: [],
            filteredReports: [],
            modalIsOpen: false,
            report: {},
            isLoading: true
        }
    }
    componentDidMount() {
        serviceReports.getReports()
            .then(response => this.setState({ reports: response, filteredReports: response }))
            .finally(() => this.setState({ isLoading: false }))
    }
    openModal = (report = {}) => {
        this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen, report }))
    }

    searchReports = (text) => {
        const filtered = search(this.state.reports, ['name', 'companyName'], text);
        this.setState({ filteredReports: filtered })
    }

    deleteReport = (id) => {
        serviceReports.removeReports(id)
        const filtered = this.state.reports.filter(report => report.id !== id)
        this.setState({ filteredReports: filtered })
    }

    render() {
        const access = Authentication();
        if (!access) {
            this.props.history.push("/admin")
        }
        if (this.state.isLoading) {
            return <Loading />
        }
        return (
            <>
                <Header isHomePage={false} />
                <Container>
                    <Search search={this.searchReports} />
                    {this.state.filteredReports.length
                        ? <Report
                            reports={this.state.filteredReports}
                            modalIsOpen={this.state.modalIsOpen}
                            openModal={this.openModal}
                            report={this.state.report}
                            deleteReport={this.deleteReport}
                        />
                        : <h4 className={style.textCenter}>Sorry, we do not have that candidate neither company in our system &#x1F610;</h4>
                    }

                </Container>
            </>
        )
    }
}
export { Reports }