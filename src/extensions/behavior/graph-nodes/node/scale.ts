import { LiteGraphNode } from '../typings';

export class GetScale extends LiteGraphNode {
    // Static members
    public static Desc = 'Get Object Scale by Vec3';
    public static Title = 'Get Scale';

    /**
     * Constructor
     */
    constructor () {
        super();

        this.title = 'Get Scale';

        this.addOutput('vec3', 'vec3');
        this.addOutput('x', 'number');
        this.addOutput('y', 'number');
        this.addOutput('z', 'number');
        this._data = new Float32Array(3);
    }

    /**
     * On execute the node
     */
    public onExecute (): void {
        const data = this._data;
        const node = this.graph.scriptObject;

        data[0] = node.scaling.x;
        data[1] = node.scaling.y;
        data[2] = node.scaling.z;

        this.setOutputData(0, data);
        this.setOutputData(1, data[0]);
        this.setOutputData(2, data[1]);
        this.setOutputData(3, data[2]);
    }
}

export class SetScale extends LiteGraphNode {
    // Static members
    public static Desc = 'Set Object Scale by Vec3';
    public static Title = 'Set Scale';
    
    /**
     * Constructor
     */
    constructor () {
        super(true);

        this.title = 'Set Scale';

        this.addInput('vec3', 'vec3');
        this.addInput('x','number');
        this.addInput('y','number');
        this.addInput('z','number');

        this.addOutput('vec3', 'vec3');

        this._data = new Float32Array(3);
    }

    /**
     * On execute the node
     */
    public onExecute (): void {
        const data = this._data;
        const node = this.graph.scriptObject;
        const vec3 = this.getInputData(1);

        if (vec3) {
            node.scaling.x = data[0] = vec3[0];
            node.scaling.y = data[1] = vec3[1];
            node.scaling.z = data[2] = vec3[2];
        }
        else {
            node.scaling.x = data[0] = this.getInputData(2);
            node.scaling.y = data[1] = this.getInputData(3);
            node.scaling.z = data[2] = this.getInputData(4);
        }

        this.setOutputData(0, data);
    }
}
