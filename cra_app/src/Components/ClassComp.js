import { Component } from "react";

const btn = {
      padding: "8px 14px", margin: 5, border: "none", borderRadius: 6, color: "#fff", cursor: "pointer"
};

class ClassComp extends Component {
      state = { count: 0 };

      inc = () => this.setState( { count: this.state.count + 1 } );
      dec = () => this.setState( { count: this.state.count - 1 } );

      render() {
            const { name, id, gender } = this.props;
            const { count } = this.state;

            return (
                  <div style={{ textAlign: "center" }}>
                        <h3>Counter : {count}</h3>

                        <p>
                              <b>Name:</b> {name} <br />
                              <b>ID:</b> {id} <br />
                              <b>Gender:</b> {gender}
                        </p>

                        <button style={{ ...btn, background: "#48bb78" }} onClick={this.inc}>
                              Increment
                        </button>

                        <button style={{ ...btn, background: "#f56565" }} onClick={this.dec}>
                              Decrement
                        </button>
                  </div>
            );
      }
}

export default ClassComp;
