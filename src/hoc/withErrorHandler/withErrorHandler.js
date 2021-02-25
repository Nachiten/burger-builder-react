import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({ error: error });
            });
        }

        componentWillUnmount(){
            console.log("Se va a desmontar", this.reqInterceptor, this.resInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
             axios.interceptors.request.eject(this.reqInterceptor);
        }

        confirmarErrorHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.confirmarErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>

            );
        }
    }
};

export default withErrorHandler;
