import React, {Component} from 'react';
import './App.css';
import InputMask from 'react-input-mask';
import {Button, Dialog, DialogTitle, List, ListItem, ListItemText, TextField} from "@material-ui/core";

var tarefas = [
    {
        id: 1,
        horario: "10:00",
        tarefa: "TESTE"
    }
]

var tarefaSelecionada;

class DialogAdicionar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldHorario: '',
            textFieldTarefa: ''
        };

        this.handleChangeHorario = this.handleChangeHorario.bind(this);
        this.handleChangeTarefa = this.handleChangeTarefa.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleChangeHorario(event) {
        this.setState({textFieldHorario: event.target.value});
    }

    handleChangeTarefa(event) {
        this.setState({textFieldTarefa: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        tarefas.push({
            id: Math.floor(Math.random() * (+999 - +0)) + +0,
            horario: this.state.textFieldHorario,
            tarefa: this.state.textFieldTarefa
        })

        this.handleClose();
    }

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">ADICIONAR TAREFA</DialogTitle>
                <div>
                    Horário:
                    <InputMask mask="99:99" value={this.state.textFieldHorario} onChange={this.handleChangeHorario}>
                        {() => <TextField />}
                    </InputMask>
                    <br/>

                    Tarefa:
                    <TextField value={this.state.textFieldTarefa} onChange={this.handleChangeTarefa}/>
                    <br/>

                    <Button onClick={this.handleSubmit}>OK</Button>
                </div>
            </Dialog>
        );
    }

}

class DialogEditar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldHorario: '',
            textFieldTarefa: ''
        };

        this.handleChangeHorario = this.handleChangeHorario.bind(this);
        this.handleChangeTarefa = this.handleChangeTarefa.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleChangeHorario(event) {
        this.setState({textFieldHorario: event.target.value});
    }

    handleChangeTarefa(event) {
        this.setState({textFieldTarefa: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const index = tarefas.findIndex(tarefa => tarefa.id === tarefaSelecionada.id)
        tarefas[index] = {
            horario: this.state.textFieldHorario,
            tarefa: this.state.textFieldTarefa
        };
        this.setState({tarefas});

        this.handleClose()
    }

    render() {
        const {classes, onClose, selectedValue, ...other} = this.props;

        return (
            <Dialog id="dialogEditarTarefa" onClose={this.handleClose} {...other}>
                <DialogTitle id="dialogTitleEditarTarefa">EDITAR TAREFA</DialogTitle>
                <div>
                    Horário:
                    <InputMask mask="99:99" value={this.state.textFieldHorario} onChange={this.handleChangeHorario}>
                        {() => <TextField />}
                    </InputMask>
                    <br/>

                    Tarefa:
                    <TextField id="textFieldEditarTarefa" onChange={this.handleChangeTarefa}/>
                    <br/>

                    <Button onClick={this.handleSubmit}>OK</Button>
                </div>
            </Dialog>
        );
    }

}

const SimpleDialogWrappedAdicionar = (DialogAdicionar);
const SimpleDialogWrappedEditar = (DialogEditar);

class Main extends Component {

    state = {
        dialogAdicionarVisible: false,
        dialogEditarVisible: false,
        dialogExcluirVisible: false
    }

    setDialogAdicionarVisible = () => this.setState({dialogAdicionarVisible: true});
    setDialogEditarVisible = () => this.setState({dialogEditarVisible: true});

    setDialogAdicionarClosed = value => this.setState({selectedValue: value, dialogAdicionarVisible: false});
    setDialogEditarClosed = value => this.setState({selectedValue: value, dialogEditarVisible: false});

    handleClickExcluir = (index, event) => {
        event.preventDefault();

        tarefas.splice(index, 1);
        this.setState(tarefas)
    };

    openDialogEditarId(tarefa) {
        this.setDialogEditarVisible();

        tarefaSelecionada = tarefas[tarefa]
    }

    render() {
        return (
            <div className="Main">
                <header className="App-header">

                    <div id={"labelListaDeTarefas"}> Lista de Tarefas</div>

                    <List>
                        {
                            tarefas.map(tarefa => (
                                <ListItem key={tarefa.id}>
                                    <ListItemText primary={tarefa.horario}/>
                                    <ListItemText secondary={tarefa.tarefa}/>

                                    <Button
                                        onClick={() => this.openDialogEditarId(tarefas.indexOf(tarefa))}>Editar</Button>
                                    <SimpleDialogWrappedEditar
                                        open={this.state.dialogEditarVisible}
                                        onClose={() => this.setDialogEditarClosed()}/>

                                    <Button
                                        onClick={(event) => this.handleClickExcluir(tarefas.indexOf(tarefa), event)}>Excluir</Button>

                                </ListItem>
                            ))
                        }
                    </List>

                    <div>
                        <Button onClick={this.setDialogAdicionarVisible}>Adicionar Tarefa</Button>
                        <SimpleDialogWrappedAdicionar
                            open={this.state.dialogAdicionarVisible}
                            onClose={() => this.setDialogAdicionarClosed()}/>
                    </div>
                </header>
            </div>
        );

    }

}

export default Main;