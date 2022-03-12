import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "../style/editor.css";
// import { convertFromRaw } from "draft-js";

let defaultContent = "<div>Type your notes here</div>";

class EditorConvertToHTML extends Component {
    // state = {
    //     editorState: EditorState.createEmpty(),
    //     contentState: convertFromRaw(content),
    // };

    constructor(props) {
        super(props);
        // console.log("editor component constructor", this.props.initialNote);
        // console.log(!this.props.initialNote);
        // console.log(
        //     "editor component constructor content: ",
        //     this.props.initialNote.content
        // );
        defaultContent = !this.props.initialNote
            ? defaultContent
            : this.props.initialNote;
        // console.log("editor component constructor content after: ", content);

        const blocksFromHtml = htmlToDraft(defaultContent);
        const { contentBlocks, entityMap } = blocksFromHtml;

        // const contentState = convertFromRaw(content);
        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            contentState,
            editorState,
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onContentStateChange = (contentState) => {
        // console.log("onContentStateChange: ", contentState);
        this.props.inputOnChange(
            draftToHtml(
                convertToRaw(this.state.editorState.getCurrentContent())
            )
        ); // onChange will set newValue to input.value, so value can be back to form for form submission
        this.setState({
            contentState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor"
                    onEditorStateChange={this.onEditorStateChange}
                    onContentStateChange={this.onContentStateChange}
                />
                {/* <textarea
                    disabled
                    value={draftToHtml(
                        convertToRaw(editorState.getCurrentContent())
                    )}
                />
                <textarea
                    disabled
                    value={JSON.stringify(contentState, null, 4)}
                /> */}
            </div>
        );
    }
}

export default EditorConvertToHTML;
