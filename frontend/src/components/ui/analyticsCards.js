export default function analyticsCards(data) { 
    return ` 
    <div class="row g-4"> 
        <div class="col-lg-3 col-md-6"> 
            <div class="analytics-card bg-danger"> 
                <div class="d-flex justify-content-between align-items-center"> 
                    <div>
                        <h6>Total Assemblers</h6>
                        <h2>${data.assemblers}</h2>
                    </div>

                    <i class="fa-solid fa-gears"></i>
                </div> 
            </div> 
        </div>

        <div class="col-lg-3 col-md-6"> 
            <div class="analytics-card bg-warning"> 
                <div class="d-flex justify-content-between align-items-center"> 
                    <div>
                        <h6>Total Components</h6>
                        <h2>${data.components}</h2>
                    </div>

                    <i class="fa-solid fa-microchip"></i> 
                </div> 
            </div> 
        </div>

        <div class="col-lg-3 col-md-6"> 
            <div class="analytics-card bg-success"> 
                <div class="d-flex justify-content-between align-items-center"> 
                    <div>
                        <h6>Total Workers</h6>
                        <h2>${data.workers}</h2>
                    </div>

                    <i class="fa-solid fa-users"></i> 
                </div> 
            </div> 
        </div>

        <div class="col-lg-3 col-md-6"> 
            <div class="analytics-card bg-primary"> 
                <div class="d-flex justify-content-between align-items-center"> 
                    <div>
                        <h6>Total Companies</h6>
                        <h2>${data.companies}</h2>
                    </div>

                    <i class="fa-solid fa-building "></i> 
                </div> 
            </div> 
        </div> 
    </div> 
    `;
}