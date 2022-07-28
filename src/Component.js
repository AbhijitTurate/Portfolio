class Component {
    mount(el){
        if(this.isMounted){
            console.log(`${this.constructor.name}  is already mounted` );
            return;
        }
        this.isMounted=true;
        if(el){
            el.appendChild(this.render())
        }
        document.body.appendChild(this.render())
    }
}

export default Component

