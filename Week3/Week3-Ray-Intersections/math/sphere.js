class Sphere {
    constructor(center = new Vector3(0,0,0), radius=1) {
        // Clone the center vector to avoid external mutations
        this.center = center.clone();
        this.radius = radius;

        // Validate and set default values if necessary
        // - Default center: Zero vector
        // - Default radius: 1


        if (!(this.center instanceof Vector3)) {
            console.warn("Invalid center provided. Setting to default zero vector.");
            this.center = new Vector3(0, 0, 0);
        }

        if (typeof this.radius !== 'number' || isNaN(this.radius)) {
            console.warn("Invalid radius provided. Setting to default value of 1.");
            this.radius = 1;
        }
    }

   /**
    * Determines whether the given ray intersects the sphere and, if so, calculates the intersection details.
    * 
    * A valid intersection satisfies the following conditions:
    * 1. The intersection point is in front of the ray's origin (not behind it).
    * 2. The ray's origin is not inside the sphere.
    */
    raycast(ray) {
        // Initialize the result object with default values
        const result = {
            hit: false,      // Boolean indicating if an intersection occurred
            point: null,     // Vector3 of the intersection point
            normal: null,    // Normal vector at the intersection point
            distance: null,  // Distance from the ray origin to the intersection

            // noahs tests
            testa: null,
            testb: null,
            testc: null,
        };

        // TODO: Implement the ray-sphere intersection logic

        // a = (ahat)(ahat)
        let a = ray.clone().direction;
        a.normalize();
        a = a.dot(a);

        result.testa = a;

        // // b = 2d(o-c)
        let bpt1 = ray.clone().direction;
        bpt1.multiplyScalar(2);
        let bpt2 = ray.clone().origin;
        bpt2 = bpt2.subtract(this.center);
        let b = bpt1.dot(bpt2);

        result.testb = b;

        // c = (o-c)(o-c) - 1
        let c = ray.clone().origin.subtract(this.center);
        c = c.dot(c) -1;

        result.testc = c;

        // testing if the ray hits the sphere
        let descriminant = b*b - 4*a*c;
        if (descriminant >= 0)
        {
            result.hit = true;

            // calculate alpha
            let intersection1 = (-1*b + Math.sqrt(b*b - 4*a*c)) / 2*a;
            let intersection2 = (-1*b - Math.sqrt(b*b - 4*a*c)) / 2*a;
            let intersection = null;

            let onlyIntersection = null;
            if(!Number.isNaN(intersection1) && Number.isNaN(intersection2))
                onlyIntersection = (!Number.isNaN(intersection1) ? intersection1 : intersection2);
            if(Number.isNaN(intersection1) && !Number.isNaN(intersection2))
                onlyIntersection = (!Number.isNaN(intersection1) ? intersection1 : intersection2);

            // there are two intersections
            if(onlyIntersection == null)
            {
                // find the smallest distance from the rays origin
                let firstIntersection = Math.abs(intersection1 < Math.abs(intersection2) ? intersection1 : intersection2);
                result.distance = firstIntersection; 
                intersection = firstIntersection;

                // testing it the rays intersection point is infront of or behind the rays origin
                // test if a negative intersection exists
                if(intersection1 >= 0 || intersection2 >=0)
                    result.hit = true;
                else 
                    result.hit = false;
            }
            else // there is only one intersection
            {
                result.distance = onlyIntersection;
                intersection = onlyIntersection;

                // testing it the rays intersection point is infront of or behind the rays origin
                // test if the one intersection is a negative intersection
                result.hit = (onlyIntersection >=0 ? true : false);
            }

            // calculate the intersection point using the calculated alpha value
            // p = o + dt
            result.point = ray.clone().origin.add(ray.clone().direction.multiplyScalar(intersection));

            // calculate the normal at the rays intersection point
            // circle=<h,k,m> vector=<x,y,z>
            // n = (x-h,y-k,z-m)
            result.normal = result.point.clone().subtract(this.center);
        }      
        else 
        {
            result.hit = false;
        }
            

        


        // Recommended steps:
        // ------------------
        // 1. Understand the math: Review the basics of ray-sphere intersections. The goal is to solve 
        //    for intersection points using the quadratic equation.
        //
        // 2. Identify vectors and setup: Compute the vector from the ray's origin to the sphere's center. 
        //    Use this to derive the quadratic coefficients.
        //
        // 3. Compute the discriminant: Solve the quadratic equation. The discriminant determines if there 
        //    are real solutions and thus potential intersections.
        //
        // 4. Analyze the discriminant:
        //    - If negative, the ray misses the sphere.  Jump to step 7.
        //    - If zero or positive, calculate intersection points.
        //
        // 5. Validate intersections: Ensure the intersection is in front of the ray and the origin is 
        //    outside the sphere.
        //
        // 6. Calculate the normal vector: The normal vector is a unit vector perpendicular to the sphere's 
        //    surface at the intersection point. Hint: you can do it if you know the circle's center and 
        //    the intersection point.  Note that it must be normalized. 
        //
        // 7. Return results: If no valid intersection:
        //      return { hit: false };
        //    If valid intersection:
        //      return { hit: true, point: <Vector3>, normal: <Vector3>, distance: <Number> };

        return result;
    }
}
