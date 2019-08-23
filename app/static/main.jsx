import TextField from '@material-ui/core/TextField';
class SearchForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value});
    } 

    handleSubmit(event) {
        alert("Search box was submitted: " + this.state.value);
        event.preventDefault();
    }
    render() {
        const formStyle = {
            display: "block",
            textAlign: "center",
            margin: "20px auto",
        }
        return (
            <form className="searchForm" onSubmit={this.handleSubmit} style={formStyle}>
                <label>Search:
                {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                <TextField type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

        );
    }
}

ReactDOM.render(<SearchForm />, document.getElementById('mainBody'));