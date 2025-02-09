let triangleCounter = 1;

function addTriangle() {
    const triangleDiv = document.createElement("div");
    triangleDiv.classList.add("triangle");
    triangleDiv.id = `triangle-${triangleCounter}`;
    triangleDiv.innerHTML = `
        <h4>Triangle ${triangleCounter}</h4>
        <input type="number" placeholder="Side A" id="sideA-${triangleCounter}">
        <input type="number" placeholder="Side B" id="sideB-${triangleCounter}">
        <input type="number" placeholder="Side C" id="sideC-${triangleCounter}">
        <button class="remove-btn" onclick="removeTriangle(${triangleCounter})">❌ Remove</button>
    `;

    document.getElementById("triangles").appendChild(triangleDiv);
    triangleCounter++;
}

function removeTriangle(id) {
    const triangleToRemove = document.getElementById(`triangle-${id}`);
    triangleToRemove.style.opacity = 0;
    triangleToRemove.style.transform = "translateY(-20px)";
    triangleToRemove.addEventListener('transitionend', () => {
        triangleToRemove.remove();
        recalculateTriangleNumbers();
        calculateTotalArea();
    });
}

function recalculateTriangleNumbers() {
    const remainingTriangles = document.querySelectorAll('.triangle');
    let counter = 1;
    remainingTriangles.forEach(triangle => {
        const h4 = triangle.querySelector('h4');
        h4.textContent = `Triangle ${counter}`;
        triangle.id = `triangle-${counter}`;

        const inputs = triangle.querySelectorAll('input');
        inputs.forEach(input => {
            const parts = input.id.split('-');
            input.id = `${parts[0]}-${counter}`;
        });

        const removeButton = triangle.querySelector('.remove-btn');
        removeButton.onclick = () => removeTriangle(counter);

        counter++;
    });

    triangleCounter = counter;
}

function calculateTotalArea() {
    let totalArea = 0;
    let validTriangles = 0;

    for (let i = 1; i < triangleCounter; i++) {
        const sideA = parseFloat(document.getElementById(`sideA-${i}`)?.value);
        const sideB = parseFloat(document.getElementById(`sideB-${i}`)?.value);
        const sideC = parseFloat(document.getElementById(`sideC-${i}`)?.value);

        if (isNaN(sideA) || isNaN(sideB) || isNaN(sideC) || sideA <= 0 || sideB <= 0 || sideC <= 0) {
            continue;
        }

        const s = (sideA + sideB + sideC) / 2;
        const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

        if (!isNaN(area)) {
            totalArea += area;
            validTriangles++;
        }
    }

    if (validTriangles === 0) {
        document.getElementById("output").innerHTML = "❌ No valid triangles entered!";
        return;
    }

    const cents = totalArea / 40.468603;

    document.getElementById("output").innerHTML = `
        <p>🔷 Total Area: <strong>${totalArea.toFixed(2)} square units</strong></p>
        <p>🌎 Equivalent Land Area: <strong>${cents.toFixed(2)} cents</strong></p>
    `;
}
