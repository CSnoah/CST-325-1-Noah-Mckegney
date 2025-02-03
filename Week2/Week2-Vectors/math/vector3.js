/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */


// Team: Noah Mckegney and Tyler Pesi
// Abstarct: a class that offers functionality congruent with the behavior of vectors
// Date 2/2/25

class Vector3 {
    constructor(x=0, y=0, z=0) { // initilize variables
        // todo - make sure to set a default value in case x, y, or z is not passed in

        // create a new vector

        this.x = x;
        this.y = y;
        this.z = z;
        //console.log("this is x after object cstr :" + x);
    }

    //----------------------------------------------------------------------------- 
    set(x, y, z) {
        // todo set 'this' object's values to those from x, y, and z

        // set the values of a vectors coordinates

        this.x = x;
        this.y = y;
        this.z = z; 
        return this;
    }

    //----------------------------------------------------------------------------- 
    clone() {
        // copy constructor

        return new Vector3(this.x, this.y, this.z);
    }

    //----------------------------------------------------------------------------- 
    copy(other) {
        // copy the values from other into 'this'

        // set vector coordinates to the values of another vectors x,y,z points

        this.set(other.x, other.y, other.z);
        return this;
    }

    //----------------------------------------------------------------------------- 
    negate() {
        // multiply 'this' vector by -1
        // This SHOULD change the values of this.x, this.y, and this.z

        // flips the direction of a vector maintaining the same magnitude and slope

        this.set(this.x*-1,this.y*-1,this.z*-1);
        return this;
    }

    //----------------------------------------------------------------------------- 
    add(v) {
        // todo - add v to 'this' vector
        // This SHOULD change the values of this.x, this.y, and this.z

        // adds a vectors cordinate points by a scalar value

        this.set(this.x+v.x,this.y+v.y,this.z+v.z);
        return this;
    }

    //----------------------------------------------------------------------------- 
    subtract(v) {
        // todo - subtract v from 'this' vector
        // This SHOULD change the values of this.x, this.y, and this.z

        // subtracts a vectors cordinate points by a scalar value

        this.set(this.x-v.x,this.y-v.y,this.z-v.z);
        return this;
    }

    //----------------------------------------------------------------------------- 
    multiplyScalar(scalar) {
        // multiply 'this' vector by "scalar"
        // This SHOULD change the values of this.x, this.y, and this.z

        // multiplies a vectors cordinate points by a scalar value

        this.set(this.x*scalar,this.y*scalar,this.z*scalar);
        return this;
    }

    //----------------------------------------------------------------------------- 
    length() {
        // todo - return the magnitude (A.K.A. length) of 'this' vector
        // This should NOT change the values of this.x, this.y, and this.z
        
        // to get the magnitude or length of a vector you apply the distance formula
        // sqrt( (x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2 )
        
        let x = this.x * this.x;
        let y = this.y * this.y;
        let z = this.z * this.z;

        // Trying to create my own sqrt function
        /*

        let sqrtOf = x + y + z;
        if(sqrtOf < 2)
            return sqrtOf;

        // crating a method that does Math.sqrt(x + y + z);
        let primeFact2 = 0;
        let acuracy = 0.00001;
        for(; primeFact2 <= sqrtOf; primeFact2+=1)
        {
            if((sqrtOf - (primeFact2*primeFact2)) <= acuracy)
                break;
        }
        return primeFact2;
        console.log("prime2: " +primeFact2);
        console.log("sqrt: " + Math.sqrt(x+y+z));

        */

        return Math.sqrt(x+y+z) 
    }

    //----------------------------------------------------------------------------- 
    lengthSqr() {
        // todo - return the squared magnitude of this vector ||v||^2
        // This should NOT change the values of this.x, this.y, and this.z

        // There are many occasions where knowing the exact length is unnecessary 
        // and the square can be substituted instead (for performance reasons).  
        // This function should NOT have to take the square root of anything.

        // This returns the calculation done in the distance formulas sqare root 
        // but dos not apply the square root, and simply returns
        // (x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2

        let x = this.x * this.x;
        let y = this.y * this.y;
        let z = this.z * this.z;

        return x+y+z;
    }

    //----------------------------------------------------------------------------- 
    normalize() {
        // todo - Change the components of this vector so that its magnitude will equal 1.
        // This SHOULD change the values of this.x, this.y, and this.z

        // Mathematical caluclation
        // To normalize a vector V you multiply its x,y,z cordinates by a scaling factor of
        // 1/||V||

        let scalingFactor = 1/this.length();
        this.multiplyScalar(scalingFactor);
        
        return this;
    }

    //----------------------------------------------------------------------------- 
    dot(other) {
        // todo - return the dot product between this vector and "other"
        // This should NOT change the values of this.x, this.y, and this.z

        // this is a scaler value that is simply the sum of multiplying the x,y,z
        // of both vecotors and then adding their products

        let dot = (this.x*other.x)+(this.y*other.y)+(this.z*other.z);
        //console.log(dot);
        return dot;
    }

    //============================================================================= 
    // The functions below must be completed in order to receive an "A"


    //----------------------------------------------------------------------------- 
    rescale(newScale) {
        // todo - Change this vector's length to be newScale

        // to change a vectors magnitude it must first be normalized
        // then in its normalized form you can multiply the vector by the amount you want
        // to scale it by

        // mathematical calculation
        // normaized vector = W
        // V = W*scalerValue

        this.normalize();
        this.multiplyScalar(newScale);
        return this;
    }

    //----------------------------------------------------------------------------- 
    static fromTo(fromPoint, toPoint) {
        if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
            console.error("fromTo requires two vectors: 'from' and 'to'");
        }
        // todo - return the vector that goes from "fromPoint" to "toPoint"
        //        NOTE - "fromPoint" and "toPoint" should not be altered

        // mathematical calculation
        // find the componentForm from the two points
        // V = <x2-x1,y2-y1,z2-z1>

        let xDis = toPoint.x - fromPoint.x;
        let yDis = toPoint.y - fromPoint.y;
        let zDis = toPoint.z - fromPoint.z;
        let componentForm = new Vector3(xDis, yDis, zDis);
        return componentForm;
    }

    //----------------------------------------------------------------------------- 
    static angle(v1, v2) {
        // todo - calculate the angle in degrees between vectors v1 and v2. Do NOT
        //        change any values on the vectors themselves

        // mathematical calculation
        // cos-1(( (dotproduct of v1,v2) / (||v||*||v2||) ) * 180/PI)

        let mult = v1.dot(v2); 
        let v = v1.length();
        let w = v2.length();
        
        let thetaRadians = Math.acos(mult/(v*w));
        let thetaDegrees = thetaRadians * (180/Math.PI);
        //console.log(thetaDegrees);
        return thetaDegrees;
    }

    //----------------------------------------------------------------------------- 
    static project(vectorToProject, otherVector) {
        // todo - return a vector that points in the same direction as "otherVector"
        //        but whose length is the projection of "vectorToProject" onto "otherVector"
        //        NOTE - "vectorToProject" and "otherVector" should NOT be altered (i.e. use clone)
        //        See "Vector Projection Slides" under "Extras" for more info.

        // mathematical calculation
        // projV = ( (dotproduct of V,U) / (||U||)^2 ) * U

        let num = vectorToProject.dot(otherVector);
        let den = (otherVector.length()*otherVector.length());
        let proj = otherVector.clone();
        proj.multiplyScalar(num/den);

        return proj;
    }
}
