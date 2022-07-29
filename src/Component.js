class Component {
    mount(el){

        this.fetchData()
        if(this.isMounted){
            console.log(`${this.constructor.name}  is already mounted` );
            return;
        }
        this.isMounted=true;
        if(el){

            el.appendChild(this.render())
            const thisRender=this.render
            console.log("this.render()",thisRender);
        }
        document.body.appendChild(this.render())
    }
}

export default Component

